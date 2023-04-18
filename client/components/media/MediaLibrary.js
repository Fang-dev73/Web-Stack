import React, { useContext, useEffect, useState } from "react";
import { Upload, message, Image, Badge } from "antd";
import { AuthContext } from "../../context/auth";
import { CloseCircleOutlined, InboxOutlined } from "@ant-design/icons";
import { MediaContext } from "../../context/media";
import axios from "axios";
import { toast } from "react-hot-toast";

const MediaLibrary = ({page = "admin"}) => {

    const [auth, setAuth] = useContext(AuthContext)
    const [media, setMedia] = useContext(MediaContext)
    const [showPreview, setShowMedia] = useState(false)
    const { Dragger } = Upload;

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const { data } = await axios.get("/media");
                setMedia((prev) => ({ ...prev, images: data }))
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchMedia();
    }, [])

    const props = {
        name: 'file',
        action: `${process.env.NEXT_PUBLIC_API}/upload-image-file`,
        multiple: true,
        headers: {
            Authorization: `Bearer ${auth.token}`
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                console.log("Uploaded Image: ", info.file)
                setMedia({
                    images: [...media.images, info.file.response],
                    selected: info.file.response,
                    showMediaModal: false
                })
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleImageDelete = async (imageId) => {
        try {
            const { data } = await axios.delete(`/media/${imageId}`);
            if (data.ok) {
                setMedia({
                    ...media,
                    images: media.images.filter((image) => image._id !== imageId),
                    selected: null
                })
                toast.success("Image Deleted Successfully")
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Dragger {...props} accept="image/*">
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text" style={{ fontFamily: "cursive" }}>Click or drag file to this area to upload</p>
                <p className="ant-upload-hint" style={{ fontFamily: "cursive" }}>Support for a single or bulk upload.</p>
            </Dragger>
            <div style={{ textAlign: "center" }}>
                {media?.images?.map((image) => (
                    <Badge>
                        <Image
                            preview={showPreview}
                            src={image.url}
                            width={220}
                            style={{ padding: 8 }}
                            onClick={() => setMedia({ ...media, selected: image })} />
                        <br />
                        {image.postedBy?._id === auth?.user?._id ?
                            (<CloseCircleOutlined
                                style={{ color: "red" }}
                                onClick={() => handleImageDelete(image._id)} />) : page === "admin" ?
                                (<CloseCircleOutlined
                                    style={{ color: "red" }}
                                    onClick={() => handleImageDelete(image._id)} />) : ''}
                    </Badge>
                ))}
            </div>
        </>


    )
}

export default MediaLibrary;