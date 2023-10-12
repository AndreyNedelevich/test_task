import {memo, useCallback, useMemo} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TaskListItem.module.scss';
import { Text } from '@/shared/ui/component/Text';
import { Card } from '@/shared/ui/component/Card';
import { Button } from '@/shared/ui/component/Button';
import { HStack, VStack } from '@/shared/ui/component/Stack';
import {Task} from "../../../model/types/Task";
import {ListBox} from "@/shared/ui/component/Popups";
import {ListBoxItem} from "@/shared/ui/component/Popups/components/ListBox/ListBox";
import {EditTaskById} from "@/entities/Task";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {modalActions} from "@/features/showModal/model/slice/modalSlice";



interface TaskListItemProps {
    className?: string;
    task: Task;
    deleteTask:(id:string)=>void;
    setTaskForUpdate:(task:Task|null)=>void
}
enum taskStatus {
    COMPLETED = 'true',
    NOTCOMPLETED = 'false',
}


export const TaskListItem = memo((props: TaskListItemProps) => {
    const { className,task,deleteTask,setTaskForUpdate } = props;
    const dispatch = useAppDispatch();

    const sortStatusOptions = useMemo<ListBoxItem<taskStatus>[]>(
        () => [
            {
                value: 'true',
                content: 'completed',
            },
            {
                value: 'false',
                content: 'not completed',
            },
        ],
        [],
    );


    const onChangeStatus = useCallback(
        (status:taskStatus) => {
            if(task.completed!==status){
                dispatch(EditTaskById({completed:status,id:task.id}))

            }
        },
        [task.id,task.completed,dispatch],
    );

  const editTask= useCallback(
      () => {
          setTaskForUpdate(task)
          dispatch(modalActions.onShowModal())
      },
      [task,setTaskForUpdate,dispatch]
  )

    return (
        <Card
            variant="outlined"
            padding="24"
            max
            className={classNames(cls.ArticleListItem,
                {[cls.complited]:task.completed==='true',[cls.not_complited]:task.completed==='false'},
                [
                className,
            ])}
        >
            <VStack max gap="16">
                <Text title={task.title} bold />
                {task?.text && (
                    <Text
                        className={cls.textBlock}
                        text={task.text}
                    />
                )}
                <HStack max justify="between">
                    <HStack gap="8">
                        <Text text="STATUS"/>
                        <ListBox
                            items={sortStatusOptions}
                            // @ts-ignore
                            value={task?.completed}
                            onChange={onChangeStatus}
                        />
                    </HStack>
                    <HStack gap="8">
                        <Button onClick={editTask}  variant="outline">
                            Edit
                        </Button>
                        <Button onClick={()=>deleteTask(task.id)} variant="outline">
                            Dalete
                        </Button>
                    </HStack>
                </HStack>
            </VStack>
        </Card>
    );
});
