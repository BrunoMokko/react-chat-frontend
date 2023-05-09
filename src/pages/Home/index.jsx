import React from 'react';
import './Home.scss';
import Status from "../../containers/Status";
import Messages from "../../containers/Messages";
import {EllipsisOutlined} from "@ant-design/icons";
import background from '../../img/background-messages.png'
import { Button} from "antd";
import ChatInput from "../../containers/ChatInput";
import {Sidebar} from "../../containers";


const Home = () => {



    var sectionStyle = {
        width: "100%",
        height: "100%",
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',

    };
    return (
        <section className='home'>
            <div className="chat">
                <Sidebar/>
                <div className="chat__dialog">
                    <div className="chat__dialog-header">
                        <div></div>
                        <Status online />
                        <Button type='circle' style={{border: 'none', boxShadow: 'none'}}
                                icon={<EllipsisOutlined style={{color:'black', fontSize: '20px', cursor: 'pointer'}}/>} />

                    </div>
                    <div className="chat__dialog-messages" style={sectionStyle}>
                        <Messages/>
                    </div>
                    <div className="chat__dialog-textarea">

                        <ChatInput/>

                    </div>

                </div>
            </div>


        </section>
    );
};

export default Home;