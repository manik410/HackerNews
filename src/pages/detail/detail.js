import React, { useEffect, useState } from "react";
import { Button, Result, Spin } from 'antd';
import { HOME } from "../../utils/routes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NewsDetailSelector, NewsIDSelector } from "../home/slice/HomeSlice";
import { newsDetail } from "../home/slice/action";
import { Markup } from 'interweave';
function Detail() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selectedNewsID = useSelector(NewsIDSelector)
    const [comments, setComments] = useState([])
    const { loading, data, error } = useSelector(NewsDetailSelector)
    useEffect(() => {
        if (selectedNewsID?.length !== 0) {
            dispatch(newsDetail(selectedNewsID))
        }
    }, [selectedNewsID])
    let arr = []
    const printComments = (object) => {
        if ("children" in object && !loading) {
            object.children.forEach((item) => {
                printComments(item)
            })
        }
        arr = [...arr, object.text]
        setComments(arr);
    }
    useEffect(()=>{
        if(data)
        {
            printComments(data)
        }
    },[data])
    return (
        <>
            <div style={{ height: "auto", position: "fixed", background: "white", width: "100%", display: 'flex', }}>
                <div style={{ padding: "17px", width: "98%", fontSize: 18, fontWeight: "bold" }}>
                    {data?.title}
                </div>
                <div style={{ right: "0", padding: "17px" }}>
                    <Button type="primary" style={{ height: "auto" }} onClick={() => navigate(HOME)}>Close</Button>
                </div>
            </div>
            <br /><br /><br /><br />
            {
                error ? <>
                    <Result
                        status="500"
                        title="500"
                        subTitle="Sorry, something went wrong."
                    /></> :
                    <>
                        {loading ?
                            <Spin className="centered" />
                            :
                            <div style={{ paddingLeft: "10px" }}>
                                <h2 style={{ fontSize: "15", color: "#00beff" }}><span style={{ color: "black", fontWeight: "bold" }}>Points: </span>{data?.points ?? "--"}</h2>
                                <h2 style={{ fontSize: "15", color: "#00beff" }}><span style={{ color: "black", fontWeight: "bold" }}>Comments :</span>{comments.length}</h2>
                                <ul >
                                    {
                                        comments?.map((item) => {
                                            return <li key={item?.id}>
                                                <Markup content={item} />
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        }
                    </>
            }
        </>
    )
}
export default Detail;