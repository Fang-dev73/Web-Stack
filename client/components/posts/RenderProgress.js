import { Progress } from "antd";
import CountTo from "react-count-to"
import Link from "next/link";

const RenderProgress = ({ number, name, link = "#" }) => {
    return (
        <Link href={link} legacyBehavior>
            <a>
                <Progress type="circle"
                    strokeColor={{
                        '10%': 'black',
                        '100%': 'blue',
                    }}
                    percent={100}
                    format={() => <CountTo to={number} speed={number * 150} />}
                />
                <p style={{ marginTop: 18, color: 'grey' }}><b>{name.toUpperCase()}</b></p>
            </a>
        </Link>
    );
}

export default RenderProgress;