import React, {memo, useCallback} from 'react';
import {useSelector} from "react-redux";
import {classNames} from '@/shared/lib/classNames/classNames';
import {VStack} from '@/shared/ui/component/Stack';
import cls from './Sidebar.module.scss';
import {TaskFilters} from "@/widgets/TaskFilters";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {taskSortField} from "@/features/TaskSortSelector/ui/TaskSortSelector/TaskSortSelector";
import {Button} from "@/shared/ui/component/Button";
import {Flex} from "@/shared/ui/component/Stack/Flex/Flex";
import {modalActions} from "@/features/showModal/model/slice/modalSlice";
import {getTaskSearch, getTaskSort} from "@/entities/Task/model/selectors/taskByUser";
import {taskActions} from "@/entities/Task/model/slice/TestSlice";
import {getUserAuthData} from "@/entities/User";



interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({className}: SidebarProps) => {

    const sort = useSelector(getTaskSort);
    const search = useSelector(getTaskSearch);
    const currentUser=useSelector(getUserAuthData)
    const dispatch = useAppDispatch();


    const onChangeSort = useCallback(
        (newSort: taskSortField) => {
            dispatch(taskActions.setSort(newSort));

        },
        [dispatch],
    );


    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(taskActions.setSearch(search));
        },
        [dispatch],
    );


    return (
        <>
                <aside
                    className={classNames(
                        cls.Sidebar,
                        {},
                        [className],
                    )}
                >
                    {currentUser &&
                    <VStack role="navigation" gap="8" className={cls.items}>
                        <Flex className={cls.padding} gap="8" max justify="start"
direction="column">
                            <Button
                                fullWidth
                                color="normal"
                                variant="filled"
                                onClick={() => dispatch(modalActions.onShowModal())}
                            >
                                Create new task
                            </Button>
                        </Flex>
                        <TaskFilters
                            className={className}
                            onChangeSearch={onChangeSearch}
                            search={search}
                            sort={sort}
                            onChangeSort={onChangeSort}
                        />
                    </VStack>
                    }
                </aside>
            )
        </>
    );
});
