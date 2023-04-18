import { useEffect, useState } from "react";
import {Row, Col, Divider} from "antd"
import axios from "axios";
import AdminLayout from "../../components/Layout/AdminLayout";
import RenderProgress from "../../components/posts/RenderProgress";
import { useNumbers } from "../../hooks/useNumbers";

function Admin () {
    const {numbers} = useNumbers();

    return(
    <AdminLayout>
        <Row>
            <Col span={24}>
                <Divider >
                    <h2 style={{fontFamily: "cursive"}}>Statistics</h2>
                </Divider>
            </Col>
        </Row>

        <Row>
            {/* posts */}
            <Col span={12} style={{marginTop: 70, textAlign: "center", fontSize: 20, fontFamily: "cursive"}}>
                <RenderProgress
                    number={numbers.posts}
                    name="Posts"
                    link="/admin/posts"
                />
            </Col>
            {/* comments */}
            <Col span={12} style={{marginTop: 70, textAlign: "center", fontSize: 20, fontFamily: "cursive"}}>
                <RenderProgress
                    number={numbers.comments}
                    name="Comments"
                    link="/admin/comments"
                />
            </Col>
        </Row>
        
        <Row>
            {/* categories */}
            <Col span={12} style={{marginTop: 80, textAlign: "center", fontSize: 20, fontFamily: "cursive"}}>
                <RenderProgress
                    number={numbers.categories}
                    name="Categories"
                    link="/admin/categories"
                />
            </Col>
            {/* users */}
            <Col span={12} style={{marginTop: 80, textAlign: "center", fontSize: 20, fontFamily: "cursive"}}>
                <RenderProgress
                    number={numbers.users}
                    name="Users"
                    link="/admin/users"
                />
            </Col>
        </Row>
        
    </AdminLayout>
    );
}

export default Admin;