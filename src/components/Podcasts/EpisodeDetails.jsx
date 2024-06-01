import Button from "../Button/Button"

const EpisodeDetails = ({ index, title, description, audioFile, onClick }) => {
    return (
        <div className="bg-customColor-blue/5 rounded-xl py-2 px-4 mb-2">
            <h2 className="text-lg font-semibold">{index}. {title}</h2>
            <p className="text-sm text-customColor-puple_grey mb-4">{description}</p>
            <Button
                text="Play"
                width={"100px"}
                onClick={() => onClick(audioFile)}
            />
        </div>
    )
}

export default EpisodeDetails