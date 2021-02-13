import React, { useEffect } from 'react'
import '../StyleCss/contact/contact.css'
import { useSelector, useDispatch } from 'react-redux'
import MyContactCart from '../Components/MyContactCart'
import ContactCart from '../Components/contactCart'
import { getContacts } from '../Reduxs/contactAcsion'
function Contact() {
    const authUser = useSelector(state => state.auth.isAuthUser)
    const dispatch = useDispatch()
    useEffect(() => { dispatch(getContacts()) }, [dispatch])
    const items = useSelector(state => state.contact.items)
    return (
        <div className={authUser ? "myContactCart" : "contContact"}>
            {authUser ? items.map(item => <MyContactCart item={item} />) : <ContactCart />}
        </div>
    )
}
export default Contact