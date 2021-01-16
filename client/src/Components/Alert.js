import React from 'react'

const Alert = ({text})=>{
return(
<div className="alert alert-primary alert" role="alert" key={text}>
   {text}
</div>
)
}
export default Alert