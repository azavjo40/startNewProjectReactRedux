//@ts-check
import { httpFetch } from "./hooks/httpFetch"
import { ALL_CONTACT } from "./types"
export const postContact = (form) => {
    return async dispach => {
            dispach(httpFetch('/api/contact', 'POST', form, null, null, null))
    }
}

export const getContacts = () => {
    return async dispach => {
            dispach(httpFetch('/api/mycontacts', 'GET', null, null, null, ALL_CONTACT))
    }
}

export const removeContact = (id) => {
    return async dispach => {
            dispach(httpFetch(`/api/contact/delete/${id}`, 'DELETE', null, null, null, null))
    }
}