import React, {memo, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useSelector} from "react-redux";
import {classNames} from '@/shared/lib/classNames/classNames';
import {Text} from '@/shared/ui/component/Text';
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {createNewTask} from '@/features/Create_EditTask/model/services/createNewTask/CreateNewTask';
import cls from './CreateEditFormTask.module.scss';
import {Button} from '@/shared/ui/component/Button';
import {VStack} from '@/shared/ui/component/Stack';
import {EditTaskById, Task} from "@/entities/Task";
import {getUserAuthData} from "@/entities/User";
import {USER_LOCALSTORAGE_KEY} from "@/shared/const/localstorage";
import {createEditTaskValidators} from "@/shared/validators";


export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
    taskForUpdate?:Task|null;
    setTaskForUpdate:(task:Task|null)=>void
}



const CreateEditFormTask = memo(({className, onSuccess,taskForUpdate,setTaskForUpdate}: LoginFormProps) => {
    const dispatch = useAppDispatch();
    const currentUser = useSelector(getUserAuthData)

    const {register, handleSubmit, reset, formState: {errors, isValid}, setValue} = useForm<Task>({
        mode: 'all',
        resolver: joiResolver(createEditTaskValidators)
    });

    useEffect(() => {
        if (taskForUpdate) {
            Object.entries(taskForUpdate).forEach(([key, value]) => {
                if (key === 'title'||key==='text') {
                    setValue(key as keyof Task, value, {shouldValidate: true})
                }
            })
        }

    }, [taskForUpdate, setValue])

    const save: SubmitHandler<Task> = async (task) => {
        const newTask = {
            ...task,
            id: Date.now().toString(),
            completed: "false",
            userId: currentUser?.id||localStorage.getItem(USER_LOCALSTORAGE_KEY) as string
        };
         const result = await dispatch(createNewTask(newTask));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
        reset()
    };


    const update: SubmitHandler<Task> = async (task:Task) => {
        // @ts-ignore
        const response = await dispatch(EditTaskById({...task,id:taskForUpdate.id}))
        if (response) {
            onSuccess();
        }
        reset()
        setTaskForUpdate(null)
    };




    return (
        <form onSubmit={handleSubmit(taskForUpdate ? update : save)}>
            <VStack
                gap="16"
                className={classNames(cls.LoginForm, {}, [className])}
            >
                <Text title={taskForUpdate ? 'Update task':'Create new task'}/>
                {errors.title &&  <Text
                        text={errors.title.message}
                        variant="error"
                    />}
                {errors.text &&  <Text
                    text={errors.text.message}
                    variant="error"
                />}
                <input
                    type="text"
                    className={cls.input}
                    placeholder="title"
                    {...register('title')}
                />
                <input
                    type="text"
                    className={cls.input}
                    placeholder="description task"
                    {...register('text')}
                />
                <Button
                    type="submit"
                    className={cls.loginBtn}
                    disabled={!isValid}
                >
                    {taskForUpdate ? 'Update' : 'Save'}
                </Button>
            </VStack>
        </form>
    );
});

export default CreateEditFormTask;
