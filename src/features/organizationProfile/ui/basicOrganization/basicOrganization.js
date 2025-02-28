import {useForm} from "react-hook-form";
import cls from "../organizationProfile.module.sass";
import {Box} from "shared/ui/box/box";
import {Input} from "shared/ui/input";
import {Select} from "shared/ui/select";
import {Textarea} from "shared/ui/textArea";
import {Button} from "shared/ui/button/button";
import {useState} from "react";
import {useDropzone} from "react-dropzone";

export const BasicOrganization = () => {

    const {register, handleSubmit} = useForm()
    const [dropzones, setDropzones] = useState([{id: Date.now(), files: []}])
    const onAdd = (data) => {
        console.log(data)
    }


    const handleAddDropzone = () => {
        setDropzones([...dropzones, {id: Date.now(), files: []}]);
    };

    const handleDrop = (index, acceptedFiles) => {
        const newDropzones = dropzones.slice();
        newDropzones[index].files = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        setDropzones(newDropzones);
    };


    return (
        <div className={cls.addDirections}>

            <Box extraClass={cls.box}>
                <h2>
                    Logo
                </h2>

                {dropzones?.map((dropzone, index) => (
                    <DropzoneComponent
                        key={dropzone?.id}
                        index={index}
                        files={dropzone?.files}
                        onDrop={(acceptedFiles) => handleDrop(index, acceptedFiles)}
                    />
                ))}

            </Box>
            <Box extraClass={cls.box}>
                <h2>
                    Name
                </h2>
                <Input name={"name"} register={register}/>
            </Box>


            <Box extraClass={cls.box}>
                <h2>Viloyat</h2>
                <Select/>
            </Box>

            <Box extraClass={cls.box}>
                <h2>
                    Kontrakt to’lov
                </h2>
                <Textarea/>
            </Box>

            <Box extraClass={cls.box}>
                <h2>Qabul muddati</h2>
                <Textarea/>
            </Box>
            <Box extraClass={cls.button}>
                <Button onClick={handleSubmit(onAdd)}>Add</Button>
            </Box>
        </div>
    );
};


const DropzoneComponent = ({index, files, onDrop}) => {
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop
    });

    return (
        <div {...getRootProps({className: cls.dropzone})}>
            <input {...getInputProps()} />
            {files?.length > 0 && files[0] ? (
                <div className={cls.imagesContainer}>
                    {files?.map((file, i) => (
                        <img key={i} src={file?.preview} alt={`preview ${i}`} className={cls.imagePreview}/>
                    ))}
                </div>
            ) : (
                <div className={cls.placeholder}>
                    {/*<img src={defaultImage} alt="Default" className={cls.defaultImage}/>*/}

                    <i className={"fa fa-plus"}/>

                </div>
            )}
        </div>
    );
};


export const AboutOtm = () => {
    return (

        <div className={cls.aboutOtm}>
            <h2>
                OTM haqida
            </h2>

            <Box extraClass={cls.aboutOtm_box}>
                <Textarea/>

                <Button>Edit</Button>

            </Box>
        </div>
    )
}


export const Grants = () => {
    return (

        <div className={cls.aboutOtm}>
            <h2>
                Grantlar
            </h2>

            <Box extraClass={cls.aboutOtm_box}>
                <Textarea/>

                <Button>Edit</Button>

            </Box>
        </div>
    )
}


export const Gallery = () => {
    const [dropzones, setDropzones] = useState([{id: Date.now(), files: []}]);

    // Dropzone qo'shish funksiyasi
    const handleAddDropzone = () => {
        setDropzones([...dropzones, {id: Date.now(), files: []}]);
    };

    // Fayllarni yuklash funksiyasi
    const handleDrop = (index, acceptedFiles) => {
        const newDropzones = dropzones.slice();
        newDropzones[index].files = acceptedFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        setDropzones(newDropzones);
    };

    // Faylni o'chirish funksiyasi
    const handleRemoveDropzone = (index) => {
        const newDropzones = dropzones.filter((_, i) => i !== index);
        setDropzones(newDropzones);
    };

    return (
        <div>
            <div className={cls.gallery__header}>
                <h2>Galereya</h2>
                <Button onClick={handleAddDropzone}>
                    <i className={"fa fa-plus"}/>
                </Button>
            </div>
            <Box extraClass={cls.gallery}>
                <div className={cls.gallery__box}>
                    {dropzones?.map((dropzone, index) => (
                        <DropzoneGallery
                            key={dropzone?.id}
                            index={index}
                            files={dropzone?.files}
                            onDrop={(acceptedFiles) => handleDrop(index, acceptedFiles)}
                            onRemove={() => handleRemoveDropzone(index)} // Butun Dropzone ni o'chirish
                        />
                    ))}
                </div>
            </Box>
        </div>
    );
};

const DropzoneGallery = ({index, files, onDrop, onRemove}) => {
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop,
    });

    return (
        <div className={cls.gallery__img}>
            <div {...getRootProps({className: cls.dropzone})}>
                <input {...getInputProps()} />
                {files?.length > 0 ? (
                    <div className={cls.gallery__container}>
                        {files?.map((file, i) => (
                            <img
                                key={i}
                                src={file?.preview}
                                alt={`preview ${i}`}
                                className={cls.imagePreview}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={cls.gallery__placeholder}>
                        <i className={"fa fa-plus"}/>
                    </div>
                )}
            </div>
            {files.length > 0 ? <h2 onClick={onRemove} className={cls.removeText}>
                O’chirish
            </h2> : null}
        </div>
    );
};