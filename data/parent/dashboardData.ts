export interface ChildItem {
    name: string;
    avatar: any; // or proper type for require()
    mode: string
}

export interface modeProp {
    id: string,
    name: string,
    avatar: any
}


export const childrenData: ChildItem[] = [
    {
        name: 'Mia',
        avatar: require("@/assets/images/parent/dashboard/Mia_60x60.png"),
        mode: 'focus'

    },
    {
        name: 'Jesse',
        avatar: require("@/assets/images/parent/dashboard/Jesse_60x60.png"),
        mode: 'pathway'
    }
]

export const modesData: modeProp[] = [
    {
        id: 'focus',
        name: 'Focus',
        avatar: require("@/assets/images/parent/dashboard/mode-focus.png")
    },
    {
        id: 'pathway',
        name: 'Pathway',
        avatar: require("@/assets/images/parent/dashboard/mode-pathway.png")
    },
    {
        id: 'free',
        name: 'Free',
        avatar: require("@/assets/images/parent/dashboard/mode-free.png")
    }
]
