// app/utils/navItemsForRole.ts

export type Role = 'SUPERUSER' | 'ADMIN' | 'COORDINATOR' | 'PARTICIPANT';

export interface NavItem {
    label: string;
    to: string;
    icon?: string;
    exact?: boolean;
}

export const coordinatorNav = [{ label: 'Coordinator Home', to: '/dashboard/coordinator' }];

export const adminNav = [{ label: 'Admin Home', to: '/dashboard/admin' }];

export const participantNav = [
    { label: 'My Dashboard', to: '/dashboard/participant' },
    { label: 'Resources', to: '/projects' },
];

export const superuserNav = [
    { label: 'Manage Teams', to: '/dashboard/manage/teams' },
    { label: 'Manage Expenses', to: '/dashboard/manage/expenses' },
    { label: 'Manage Trips', to: '/dashboard/manage/trips' },
];

export default function navItemsForRole(role: Role): NavItem[] {
    switch (role) {
        case 'SUPERUSER':
            return [
                { label: 'Manage Teams', to: '/dashboard/manage/teams' },
                { label: 'Manage Expenses', to: '/dashboard/manage/expenses' },
                { label: 'Manage Trips', to: '/dashboard/manage/trips' },
            ];
        case 'ADMIN':
            return adminNav;
        case 'COORDINATOR':
            return coordinatorNav;
        case 'PARTICIPANT':
        default:
            return participantNav;
    }
}
