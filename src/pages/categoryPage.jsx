import React from "react"
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {Typography, makeStyles, Card, CardContent, CardMedia, Grow} from "@material-ui/core"
import { getCarousel, getCategory } from "../action"

const useStyles = makeStyles(()=>({
    root:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10vh"
    },
   media:{
       height: "30vw"
   },
   cardContainer: {
       display: "flex",
       justifyContent: "space-evenly",
       flexDirection: "row",
       flexWrap: "wrap" ,
   },
   card:{
       width: "45vw",
       height: "70vh",
       marginBottom: "2vh",
       marginTop: "2vh", 
   },
   media:{
       height: "100%"
   },
   link:{
    textDecoration: "none",
    color: "#000"
  }
}))

const Category = () =>{
    const [checked, setChecked] = React.useState(true)
    const classes = useStyles()
    const {carousel,category} = useSelector((state)=>{
        return{
            carousel: state.carouselReducer.carousel,
            category: state.categoryReducer.category
        }
    })

    const dispatch = useDispatch()
    React.useEffect(()=>{
        dispatch(getCarousel())
        dispatch(getCategory())
    },[])

    const renderCard = ()=>{
        return category.map((item)=>{
            return(
                <Link to="/" className={classes.link} key={item.id}>
                    <Grow in={checked}  {...(checked ? { timeout: 1000 } : {})}>
                        <Card className={classes.card} >
                            <CardContent >
                                <Typography variant="h4">{item.category}</Typography>
                            </CardContent>
                            <CardMedia
                                className={classes.media}
                                image={carousel[item.id].image}/>
                        </Card>
                    </Grow>
                    </Link>

            )
        })
    } 
    return(
        <div className={classes.root}>
            <Typography variant="h1">Category Page</Typography>
            <div className={classes.cardContainer} >
                {renderCard()}
            </div>
    
        </div>
    )
}

export default Category