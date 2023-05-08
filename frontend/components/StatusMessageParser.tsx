import { StatusMessage } from "../types"

type Props = {
    statusMessage: StatusMessage
}

const StatusMessageParser: React.FC<Props> = ({statusMessage}) => {
    return (
        <div>
            {statusMessage && (
                <p className={`text-center mb-4 alert ${statusMessage.type === "error" ? "alert-danger": "alert-success"}`}>{statusMessage.message}</p>
            )}
        </div>
    )
}

export default StatusMessageParser