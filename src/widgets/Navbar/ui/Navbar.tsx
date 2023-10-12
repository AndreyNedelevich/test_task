import { useNavigate } from 'react-router-dom';
import React, {memo, useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {classNames} from '@/shared/lib/classNames/classNames';

import {LoginModal} from '@/features/AuthByUsername';
import {getUserAuthData} from '@/entities/User';
import {HStack} from '@/shared/ui/component/Stack';
import {AvatarDropdown} from '@/features/avatarDropdown';
import cls from './Navbar.module.scss';
import {Button} from '@/shared/ui/component/Button';
import {AppRoutes, getRouteMain, getRouteTaskByUser} from "@/shared/const/router";

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({className}: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const navigate = useNavigate();

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);



    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <HStack gap="16" className={cls.actions}>
                    <Button
                        variant="clear"
                        className={cls.links}
                        onClick={() => navigate(getRouteTaskByUser())}
                    >
                        TASKS
                    </Button>
                    <Button
                        variant="clear"
                        className={cls.links}
                        onClick={() => navigate(getRouteMain())}
                    >
                        MAIN
                    </Button>
                    <AvatarDropdown/>
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <HStack gap="16" className={cls.actions}>
            <Button
                variant="clear"
                className={cls.links}
                onClick={() => navigate(AppRoutes.MAIN)}
            >
                MAIN
            </Button>
            <Button
                variant="clear"
                className={cls.links}
                onClick={onShowModal}
            >
                LOG-IN
            </Button>
            </HStack>
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal}/>
            )}
        </header>
    );
});
