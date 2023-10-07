"use client"

import { useState } from "react"

interface Props {
    tags: string[]
    onChange: (tags: string[]) => void
}

const TagsList: React.FC<Props> = ({tags, onChange}) => {
    const [selectedTags, setSelectedTags] = useState<string[]>(tags)
    
    return (
        <div className="flex flex-row gap-2 overflow-x-scroll h-36">
            {tags.map((tag, index) => {
                return (
                    <Tag tag={tag} key={index} />
                )
            })}
        </div>
    )
}

const Tag: React.FC<{tag: string}> = ({tag}) => {
    const [selected, setSelected] = useState(false)

    return (
        <div onClick={()=>{setSelected(!selected)}} className={`h-fit transition-all px-4 py-2 rounded-full ${selected ? "bg-white text-black" : "bg-[#2A2A2A] text-white"}`}>
            <p>{tag}</p>
        </div>
    )
}

export default TagsList