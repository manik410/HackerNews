import React, { useEffect, useState } from "react";
import { Result, message, Spin, Row, Col ,Card} from 'antd'
import './home.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getNews } from "./slice/action";
import { NewsSelector, resetNews, setNews } from "./slice/HomeSlice";
import { NEWS_DETAIL } from "../../utils/routes";
function Home() {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { loading, data, error } = useSelector(NewsSelector)
    const onChange = (e) => {
        setSearch(e.target.value);
    }
    const submit = () => {
        if (search.length === 0) {
            message.error("Please enter some text to search");
        }
        else {
            dispatch(resetNews())
            dispatch(getNews(search))
        }
    }
    useEffect(()=>{
        dispatch(resetNews())
    },[])
    useEffect(() => {
        console.log(data?.hits)
    }, [data])
    return (
        <>
            <center>
                <div id='search-fs'>
                    <i aria-hidden='true' className='fa fa-search'></i>
                    <input value={search} onChange={onChange} id='search-text' name='q' placeholder='Search here' required='' type='text' />
                    <button onClick={submit}>Search</button>
                </div>

            </center>
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
                            <>
                                {data?.hits.length === 0 && <div style={{ fontWeight: "bold", width: "50%", margin: "20px auto", padding: '40px', textAlign: "center", fontSize: "20px" }}>No data Found Please search for something else.</div>}
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    {
                                        data?.hits.map(item => {
                                            return (
                                                <Col className="gutter-row" span={8} key={item?.objectID}>
                                                    <Card
                                                        className="cards"
                                                        hoverable
                                                        onClick={()=>{
                                                            dispatch(setNews(item?.objectID))
                                                            navigate(NEWS_DETAIL)
                                                        }}
                                                    >
                                                        <h2 style={{fontSize:"15",color:"#00beff"}}><span style={{color:"black",fontWeight:"bold"}}>Title: </span>{item?.title??"--"}</h2>
                                                        <h3 style={{fontSize:"15",color:"#00beff"}}><span style={{color:"black",fontWeight:"bold"}}>Author: </span>{item?.author??"--"}</h3>
                                                    </Card>
                                                </Col>
                                            )
                                        })
                                    }

                                </Row>
                            </>
                        }
                    </>
            }
        </>
    )
}
export default Home;