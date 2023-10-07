interface IconFieldProps {
    icon: string
    text: string
    subtext?: string
}

const IconField: React.FC<IconFieldProps> = ({icon, text, subtext}) => {
    return (
        <div className="flex flex-row gap-1 h-fit">
            <img src={icon} className="w-5 h-5 mb-auto"/>
            <div className="flex flex-col">
                <p className={`text-xs ${subtext ? "text-white" : "text-secondary"} my-auto mb-0`}>{text}</p>
                {subtext && (
                    <p className="text-[1.8vw] text-secondary">{subtext}</p>
                )}
            </div>
        </div>
    )
}

export default IconField