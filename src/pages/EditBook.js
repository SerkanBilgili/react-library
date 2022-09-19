import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import Loading from "../components/Loading";


const EditBook = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    const [bookname, setBookname] = useState("")
    const [author, setAuthor] = useState("")
    const [isbn, setIsbn] = useState("")
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3004/books/${params.bookId}`)
            .then(res => {

                console.log(res.data);
                setBookname(res.data.name)
                setAuthor(res.data.author)
                setIsbn(res.data.isbn)
                setCategory(res.data.categoryId)

                axios.get("http://localhost:3004/categories")
                    .then(res => {
                        setCategories(res.data)
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log("categories error", err));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (bookname === "" || author === "" || category === "") {

            alert("Kitap adı, Yazar, Kategori boş bırakılamaz");
            return;
        }
        const updatedBook = {
            id: params.bookId,
            name: bookname,
            author: author,
            categoryId: category,
            isbn: isbn,
        }

        axios.put(`http://localhost:3004/books/${params.bookId}`, updatedBook)
            .then(res => {
                navigate("/")

            })
            .catch((err) => console.log("edit error", err));

    };


    if (categories === null) {
        return <Loading />

    }
    return (
        <div>
            <Header />
            <div className="container my-5">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Kitap Adı"
                                value={bookname}
                                onChange={(event) => setBookname(event.target.value)}
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Kitap Yazarı"
                                value={author}
                                onChange={(event) => setAuthor(event.target.value)}
                            />
                        </div>

                    </div>

                    <div className="row my-5">
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ISBN"
                                value={isbn}
                                onChange={(event) => setIsbn(event.target.value)}
                            />
                        </div>
                        <div className="col">

                            <select className="form-select"
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                            >
                                <option value={""} selected>Kategori seçin</option>

                                {categories.map((cat) => {
                                    return (<option key={cat.id} value={cat.id}>{cat.name}</option>
                                    )
                                })
                                }
                            </select>

                        </div>
                        <div className="my-5 d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary w-25">KAYDET</button>
                            
                            <button 
                            type="button"
                            onClick={()=> navigate("/")} 
                            className="btn btn-outline-danger w-25 mx-2">
                                VAZGEÇ </button>
                        </div>

                       
                    </div>
                   
                </form>

            </div>



        </div>


    );

};

export default EditBook;