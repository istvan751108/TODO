import React, {useEffect, useState} from "react";
import PageLayout from "./parts/PageLayout";
import Input, { Textarea } from "./parts/Input";
import Cookie from "js-cookie";

const TodoUp = () => {

    const initialData = {name: '', priority: '', date: '', message: ''}
    const [data, setData] = useState(initialData)
    const initialErrors = initialData
    const [errors, setErrors] = useState(initialErrors)
    const [success, setSuccess] = useState( false )


    const handleChange = e => {
        setData( {...data, [e.target.name]: e.target.value} )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-XSRF-Token": Cookie.get("XSRF-TOKEN"),
            },
            body: JSON.stringify(data),
        })
        .then( response => {
            if( !response.ok )
                throw response;
            else
                return response.json()
        })
        .then( () => {
            //sikeres
            setSuccess(true)
            setErrors(initialErrors)
        })

        .catch( async response => {
            //hiba
            const err = await response.json();
            console.log( err );
            setErrors(err.errors)
            setSuccess(false)
        })
    };

    useEffect(() => {
        fetch("/sanctum/csrf-cookie");
    }, []);

    const Error = ( {collection, index} ) => collection[index].length > 0 ? <span className="text-danger">{errors.name}</span> : ''
    
    return (
        <PageLayout title="Teendők felvitele">
            { success && <div className="alert alert-success my-3">Sikeres felvitel!</div>}
            <form
                action=""
                method="post"
                onSubmit={handleSubmit}
                className="row g-3"
            >
                <div className="col-12 col-lg-6">
                    <Input name={"name"} label="Add meg a feladat nevét!" onChange={handleChange}/>
                    <Error collection={errors} index="name"/>
                </div>

                <div className="col-12 col-lg-6">
                    <Input name={"priority"} label="Add meg a feladat priorítását!" onChange={handleChange}/>
                    <Error collection={errors} index="priority"/>
                </div>

                <div className="col-12 col-lg-6">
                    <Input name={"date"} type="date" label="Add meg a feladat határidejét" onChange={handleChange}/>
                    <Error collection={errors} index="date"/>
                </div>

                <div className="col-12">
                    <Textarea
                        name={"message"}
                        label="Add meg a feladat leírását"
                        onChange={handleChange}
                    />
                    <Error collection={errors} index="message"/>
                </div>

                <div className="col-12 text-center">
                    <button className="btn btn-success">Rögzítés</button>
                </div>
            </form>
        </PageLayout>
    );
};

export default TodoUp;
