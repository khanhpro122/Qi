// import {Wrapper} from "../../components";
import React, {useEffect, useState} from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import './TreeGraph.css'

const useStyles = makeStyles(theme => ({
    orgNodeContainer: {
        border: "4px solid #6c757d",
        padding: "18px",
        marginTop:"15px",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "60px",
        minWidth: "120px",
        maxWidth:"200px",
        backgroundColor:"orange"
    },
    sekureOrgChart: {
        backgroundImage: "none !important;"
    },
    orgchart: {
        borderTop: "2px solid #6c757d !important"
    },
    orgPerson: {
        // color: "#27b3cc",
        justifyContent: "center",
        display: "flex",
        borderRadius: "30px",
        border: "2px solid transparent",
        // padding: "5px",
    },
    orgName: {
        fontSize: "16px"
    },
    orgNodeChildren: {
        color: "#27b3cc",
        textDecoration: "underline",
        cursor: "pointer"
    },
    openUserDetails: {
        position: "absolute",
        right   : "10px",
        top     : "10px"
    },
    '&ocNode::before': {

    },
    '&ocNode::after': {

        // height          : "14px !important",
        // backgroundColor: "#6c757d !important"
    }
}));


const RenderNode = (nodeData) => {
    const classes = useStyles();
    const data = nodeData.nodeData

    return (
        <div className={classes.orgNodeContainer}>
            <Grid container spacing={2} style={{display: 'flex', justifyContent: 'center'}} className={classes.orgPerson}>
                <Grid item xs={12} sm={12} md={12} lg={12} align="center" style={{marginTop:"-40px"}}>
                    <Avatar src={data.avatar}/>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography style={{fontWeight:"bold"}} >
                    {data.manager}
                </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography style={{fontStyle:"italic"}} >
                        {data.jobtitle}
                    </Typography>
                </Grid>

            </Grid>
            {/*<div className={classes.orgName}>{data.name}</div>*/}
            {data?.children?.length > 0 && (
                <div
                    className={classes.orgNodeChildren}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        let childNodes = document.getElementById(data.id)
                            .parentElement.childNodes;
                        if (childNodes[1].className.includes("hidden")) {
                            childNodes[0].className = classes.ocNode
                            childNodes[1].className = "";
                        } else {
                            childNodes[0].className = classes.ocNodeisChildrenCollapsed
                            childNodes[1].className = "hidden";
                        }
                    }}
                >
                    Có {data.children.length} Phòng ban
                </div>
            )}
            <Typography style = {{backgroundColor:"#2e4670", width:"100%", borderRadius:"10px", color:"white", fontWeight:"bold", fontSize:"16px"}}>
                {data.name}
            </Typography>
        </div>
    );
}
const loopNode = (nodeId, nodeData) => {
    for (let i = 0; i < nodeData?.length; i++) {
        return nodeData?.filter((child) => {
            return child.parent.id === nodeId
        })?.map((node) => {
            let idNodeChild = node.id
            return {
                id: node?.id,
                name: node?.name,
                manager: node?.manager,
                jobtitle: node?.jobtitle,
                avatar: node?.avatar,
                children: loopNode(idNodeChild, nodeData)
            }
        })
    }
}
const Structure = () => {
    const [data, setData] = useState([])
    const [orgData, setOrgData] = useState([])
    const [dataAvatar,setDataAvatar] = useState([])
    const [dataEmployees, setDataEmployees] = useState([])
    useEffect(async () => {
        try {
            const api1 = `https://api-dev.hrms.com.vn/api/v1/employee`
            const result1 = await axios.get(api1, {headers: {"Authorization": `Bearer ${localStorage.getItem("authToken")}`}}).then(res1 => {
                if (res1.status === 200) {
                    if (res1.data.message === null) {
                        res1.data.message = {};
                    }
                    console.log(res1.data.message)
                    setDataEmployees(res1.data.message)
                }
            })
        } catch (e) {
        }
    }, [])

    useEffect(async () => {
        try {
            const api = `https://api-dev.hrms.com.vn/api/v1/companystructure`
            const result = await axios.get(api, {headers: {"Authorization": `Bearer ${localStorage.getItem("authToken")}`}}).then(res => {
                if (res.status === 200) {
                    if (res.data.message === null) {
                        res.data.message = {};
                    }
                    res.data.message.map(x => Object.assign(
                        x,{"manager":`Nguyễn Văn ${ Math.round(Math.random()*10)}`}
                    ))
                    res.data.message.map(x => Object.assign(
                        x,{"jobtitle":`Chức vụ: ABC ${ Math.round(Math.random()*10)}`}
                    ))
                    res.data.message.map(x => Object.assign(
                        x,{"avatar":`${dataAvatar[Math.floor(Math.random() * dataAvatar.length)]}`}
                    ))
                    setData(res.data.message)
                }
            })
        } catch (e) {

        }
    }, [dataAvatar])
    // useEffect(async () => {
    //     try {
    //         const dataAvatar = []
    //         dataEmployees.map(x => {
    //             x.image_profile ? dataAvatar.push(x.image_profile) : null
    //         })
    //         setDataAvatar(dataAvatar)
    //     } catch (e) {
    //     }
    // }, [dataEmployees])
    useEffect(async () => {
        try {
            const dataTemp = data
            let parentNode = dataTemp?.filter((node) => {
                return node?.parent?.id === "000000000000000000000000"
            })
            let childNode = dataTemp?.filter((node) => {
                return node?.parent?.id !== "000000000000000000000000"
            })
            let rootID = "000000000000000000000000"
            dataTemp?.filter((node) => {
                if (node?.type?.name === "Company") {
                    rootID = node.id
                }
            })
            let orgData = {
                id: 1,
                name: parentNode?.map((node) => node.name),
                manager: parentNode?.map((node) => node.manager),
                jobtitle: parentNode?.map((node) => node.jobtitle),
                avatar: parentNode?.map((node) => node.avatar),
                children: loopNode(rootID, childNode)
                // children: loopNode(parentNode.id, childNode)
            };
            setOrgData(orgData)
        } catch (e) {

        }
    }, [data])

    // console.log(orgData)
    return (
        <div>
            <OrganizationChart
                datasource={orgData}
                chartClass="sekureOrgChart"
                pan={true}
                zoom={true}
                NodeTemplate={RenderNode}
            />
        </div>
    );
};

export default Structure;
