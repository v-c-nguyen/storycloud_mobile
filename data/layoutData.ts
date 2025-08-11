export interface HooterItem {
    name: string;
    icon: any; // or proper type for require()
    items?: HooterItem[]
}

export const parentHooterData: HooterItem[] = [
    {
        name: 'Dashboard',
        icon: require("@/assets/images/kid/icon-dashboard.png")

    },
    {
        name: 'Learning',
        icon: require("@/assets/images/parent/footer/icon-learning.png"),
        items: [
            {
                name: 'Library',
                icon: require("@/assets/images/parent/footer/icon-library.png")
            },
            {
                name: 'Pathway',
                icon: require("@/assets/images/parent/footer/icon-pathway.png")
            },
            {
                name: 'Focus',
                icon: require("@/assets/images/parent/footer/icon-focus.png")
            }
        ]
    },
    {
        name: 'Listen',
        icon: require("@/assets/images/parent/footer/icon-listen.png")
    },
    {
        name: 'Profile',
        icon: require("@/assets/images/parent/footer/icon-profile.png")
    }
]


export const childHooterData = [
    {
        name: 'Dashboard',
        icon: require("@/assets/images/kid/icon-dashboard.png"),
    },
    {
        name: 'Explore',
        icon: require("@/assets/images/kid/icon-explore.png"),
    },
    {
        name: 'Favourites',
        icon: require("@/assets/images/kid/icon-heart.png"),
    },
    {
        name: 'Listen',
        icon: require("@/assets/images/parent/footer/icon-listen.png")
    }
]