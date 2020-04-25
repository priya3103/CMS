import React from 'react';
import './App.css';
import { Field, reduxForm } from 'redux-form'
class ContactForm extends React.Component {
  constructor(props) {
      super(props);
      
  }
  componentDidMount()
  {
    if(this.props.ContactData)
            this.props.initialize(this.props.ContactData)
  }
   btnsubmit()
   {
     document.getElementById("btnsubmit").click();
   }
    render()
      {
          
          const { handleSubmit, pristine, reset, submitting }  = this.props
          return (   
             <div className="row">    
               {this.props.ContactData?<div className="AddTitle">Edit Contact</div> :<div className="AddTitle">Add Contact</div>                             }
            <form className="formstyle" id="contactform" onSubmit={handleSubmit}>
                <div>
                <label>First Name</label>
                <div>
                <Field
                    name="firstName"
                    component="input"
                    type="text"
                    placeholder="First Name"
                    required={true}
                />
                </div>
            </div>
            <div>
              <input name="id" type="hidden" />
        <label>Last Name</label>
        <div>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
            required={true}
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="Email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label>Designation</label>
        <div>
          <Field
            name="PositionName"
            component="input"
            type="text"
            placeholder="Position Name"
          />
        </div>
      </div>
      <div>
        <label>Company</label>
        <div>
          <Field
            name="Company"
            component="input"
            type="text"
            placeholder="Company"
          />
        </div>
      </div>
      <div>
        <label>Phone</label>
        <div>
          <Field
            name="phone"
            component="input"
            type="tel"
            placeholder="Phone"
          />
        </div>
      </div>
      <div>
        <label>Address</label>
        <div>
          <Field
            name="Address"            
            component="textarea"
            placeholder="Address"
            rows={6}
          />
        </div>
      </div>
      <div className="flex" style={{marginTop:30}}>
        <div className="butcnt" style={{paddingLeft:0}}>
                  <div className="Addcontact" onClick={()=>this.btnsubmit()}>
                    {this.props.ContactData?"Update": "Submit"}
                  </div>               
                </div> 
                <div className="butcnt">
                  <div className="Addcontact" onClick={reset}>
                     Clear Values
                  </div>               
                </div> 
                <div className="butcnt">
                  <div className="Addcontact" onClick={()=>this.props.close()}>
                   Cancel
                  </div>               
          </div> 
        <button type="submit" style={{visibility:"hidden"}} id="btnsubmit" disabled={pristine || submitting}>
          Submit
        </button>
      
      </div>
        </form>
        </div>
          );
      }
  }
export default reduxForm({
  form: 'contact' // a unique identifier for this form
})(ContactForm)
