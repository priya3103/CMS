import React from 'react';
import './App.css';
import Modal from 'react-modal';
import ContactForm from './ContactForm';
import { connect } from 'react-redux';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(74, 81, 93, 0.71)',
        overflowY: 'auto',
        overflowX: "hidden",
    },
    content: {
        position: 'none',
        top: '-22px',
        left: '0px',
        margin: "60px auto",
        maxWidth: '530px',
        width: '100%',
        height: 'auto',
        border: 'none',
        background: '#fff',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '6px',
        outline: 'none',
        padding: '25px',
        boxShadow: '0px 0px 12px 3px #5F5F5F',
        //maxHeight:'550px',

    }
};
class MyComponent extends React.Component {
  constructor() {
      super();
      this.state = {
          name: '',
          Email: '',
          NameTag:'',
          Phone:'',
          Company:'',
          Address:'',
          color:"#fff",
          PositionName:"",
          SelectedIndex:-1,
          ContactModal:false,
          search:"",filterstate:false,filterlist:[],ContactData:false
      }
      
  }
  componentDidMount()
  {
    
  }
  onchangSearch(event){
    this.setState({name:event.target.value})
  }
  ListDetailFunc(item ,index){
        this.setState({  name:item.name,
        Email: item.Email,
        NameTag:item.NameTag,
        Phone:item.phone,
        Company:item.Company,
        Address:item.Address,SelectedIndex:item.id,color:item.color,PositionName:item.PositionName})

  }
  generateColor () {
    return '#' +  Math.random().toString(16).substr(-6);
  }
  submit(data)
  {
    var listdata =this.props.data;
    data.name= data.firstName +" "+data.lastName;
    
    for(var item of listdata)
    {
      if(item.name ==data.name && item.id!==data.id)
      {
        return false;
      }
    }
    data.NameTag= (data.firstName.charAt(0)+data.lastName.charAt(0)).toUpperCase();
    data.Address= data.Address!=undefined ? data.Address :"";
    data.Email= data.Email!=undefined ? data.Email :"";
    data.phone =data.phone!=undefined ? data.phone :"";
    data.Company =data.Company!=undefined ? data.Company :"";
    data.PositionName =data.PositionName!=undefined ? data.PositionName :"";
    if(data.id != undefined)
    {
      
      for(var x in listdata)
      {
        var item =listdata[x];
        if(item.id ==data.id)
        {
          listdata[x]=data;
        }
      }
      this.setState({  name:data.name,
        Email: data.Email,
        NameTag:data.NameTag,
        Phone:data.phone,
        Company:data.Company,
        Address:data.Address,SelectedIndex:data.id,color:data.color,PositionName:data.PositionName});
        
              this.props.Addupdate(listdata); 
    }
    else{
      var newid = listdata.length+10000;
      data.id =newid;
      data.color = this.generateColor();
      listdata.unshift(data);
      this.props.Addupdate(listdata); 
    }
    
   
   
    
    
    
    this.closeModal()
  }
  modalIsOpen()
  {
    this.setState({ContactModal:true})
    
  }
  closeModal()
  {
    this.setState({ContactModal:false})
  }
  contactchoose(e)
  {
    var val =e.target.value;
    for(var item of this.props.data)
    {
      if(item.id == val)
      {
      this.setState({  name:item.name,
        Email: item.Email,
        NameTag:item.NameTag,
        Phone:item.phone,
        Company:item.Company,
        Address:item.Address,SelectedIndex:item.id,color:item.color,PositionName:item.PositionName});
        break;
      }
    }
     
  }
  search()
  {
    var val = this.state.search;
    var filterlist =[];
    for(var item of this.props.data)
    {
      if(item.name.indexOf(val) >-1)
      {
        filterlist.push(item)
      }
       if(item.Email.indexOf(val) >-1)
      {
        filterlist.push(item)
      }
       if(item.phone.indexOf(val) >-1)
      {
        filterlist.push(item)
      }
       if(item.Address.indexOf(val) >-1)
      {
        filterlist.push(item)
      }
       if(item.Company.indexOf(val) >-1)
      {
        filterlist.push(item)
      }
       if(item.PositionName.indexOf(val) >-1)
      {
        filterlist.push(item)
      }

    }
    this.setState({
      filterstate:true,filterlist:filterlist
    })
  }
  searchchange(e){
    var val =e.target.value;
    this.setState({search:val});
    if(val =="")
    {
      this.setState({
      filterstate:false
    })
    }
  }
  afteropen()
  {
    window.scrollTo(0, 0);
  }
  Editmodel()
  {
    var data={};
    for(var item of this.props.data)
    {
      if(item.id == this.state.SelectedIndex)
      {
        data=item;
        break;
      }
    }
    this.setState({ContactModal:true,ContactData:data})
  }
  render()
      {
        const data = this.state.filterstate? this.state.filterlist:this.props.data;
        const msg="No information provided";
          return (                                 

        <div className="container">  
          <div className="row">         
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12" style={{marginTop: "25px"}}>
              <div className="cp">
                 <img src={require("./Images/cb.jpg")} width={25} height={25}/>
              </div> 
              <div>
                <div className="ct1">
                  Contacts
                </div> 
                <div className="ct2">
                  Welcome to FirstCRM Contact page
                </div> 
              </div> 
              <div>
              </div> 
            </div>
            <div className="seldiv">
               <select class="browser-default" onChange={(e)=>this.contactchoose(e)}>
                <option value="" disabled selected>Please Select</option>
                 {data.map((item,index)=> {
                  return(
                    <option key={item.id} value={item.id}>{item.name}</option>
                  )
                 })}
              </select>
            </div>
          </div>
          <div className="row">         
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              
                <div className="flex padd-zero" >
                 <div className="example" > 
                  <input type="text" value={this.state.search} onChange={(e)=>this.searchchange(e)} placeholder="Search.." id="search" name="search" />
                  <i onClick={()=>this.search()} class="fa fa-search icn"></i>
                </div>  
                <div className="butcnt">
                  <div className="Addcontact" onClick={()=>this.modalIsOpen()}>
                    <i class="fa fa-plus fapuls"></i>
                    <span>Add Contact</span>
                  </div>               
                </div>        
                 </div> 
               
               
            </div>
          </div>
          <div className="row">         
           <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="ListView">
              <div className="listHeader">
                <div className="listHeader1"> 
                   <i onClick={()=>this.modalIsOpen()} class="fa fa-plus-square-o faplussquare"></i>
                  
                </div>
                <div className="listHeader2">
                  Basic info
                </div>
                <div className="listHeader3 flexcenter">
                  Company
                </div>
              </div>      
                {data.map((item,index)=> {
                  return(
                    <div key={index} className={this.state.SelectedIndex==item.id?"ListBodySelect":"ListBody"} onClick={()=>{this.ListDetailFunc(item,index)}}>
                      <div className="Icon ck1"> 
                        
                          <label className="ck2">
                            <input type="checkbox" />
                            <span className="ck3"></span>
                          </label>
                        
                      </div>
                      <div className="ContactInfo">
                        <div >
                          <div className="InfoStyle">
                            <div className="NameTag" style={{backgroundColor:item.color}}>
                              <div className="NameTagValue"> {item.NameTag}</div>
                              </div>
                              <div className="ContactDetails">
                                  <div >
                                  {item.name}
                                  </div>
                                  <div className="Email">
                                  {item.Email}
                                  </div>
                                </div>
                              </div>
                            </div>                                          
                          </div>    
                          <div className="CompanyName">
                           {item.Company}
                          </div>                           
                        </div>
                        )})
                }    
            </div>
           </div>  
            
            {this.state.name==""?null:<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <div className="ListDetail">
                <div className="ListName">
                      <div className="NameTagDetail" style={{backgroundColor:this.state.color}}>
                    <div className="TagName">{this.state.NameTag}</div>
                      </div>
                      
                      <div className="ContactName">
                    {this.state.name}
                      </div>
                      <div className="PositionName">
                       {this.state.PositionName}
                      </div>
                </div>
                <div className="editdiv" onClick={()=>this.Editmodel()}>
                   <i  class="fa fa-pencil-square-o fa fapencilsquare"></i>
                  <span>Edit</span>

                </div>
                <div className="ListDetail2">
                    <div className="listDetailHeader">
                      <span className="listDetailHeader1">FullName:</span>
                    <span className="listDetailHeader2">{this.state.name}</span>
                    </div>
                </div>  
                <div className="ListDetail2">
                      <div className="listDetailHeader">
                        <span className="listDetailHeader1">Email:</span>
                      <span className="listDetailHeader2">{this.state.Email ||this.state.Email==""?msg:this.state.Email}</span>
                      </div>
                </div>  
                <div className="ListDetail2">
                      <div className="listDetailHeader">
                        <span className="listDetailHeader1">Phone:</span>
        
                      <span className="listDetailHeader2">{this.state.Phone ==undefined ||this.state.Phone==""?msg:this.state.Phone}</span>
                      </div>
                </div>  
                <div className="ListDetail2">
                      <div className="listDetailHeader">
                        <span className="listDetailHeader1">Company:</span>
                      <span className="listDetailHeader2">{this.state.Company ==undefined ||this.state.Company==""?msg:this.state.Company}</span>
                      </div>
                </div>  
                <div className="ListDetail2" style={{border:"none"}}>
                      <div className="listDetailHeader">
                        <span className="listDetailHeader1">Address:</span>
                      <span className="listDetailHeader2">{this.state.Address ==undefined || this.state.Address==""?msg:this.state.Address}</span>
                      </div>
                </div>  
                
              </div>
          </div>}
          </div>
          <Modal
          isOpen={this.state.ContactModal}         
          onRequestClose={()=>this.closeModal()}
          onAfterOpen={()=>this.afteropen()}
          style={customStyles}
          contentLabel="Contact Modal"
          >
          <ContactForm onSubmit={(data)=>this.submit(data)} ContactData={this.state.ContactData} close={()=>this.closeModal()}/>
          </Modal>
        </div>
          );
      }
  }

const mapStateToProps = (state) => {  
  return {
    data: state.list.data
  };
};
const mapDispatchToProps = (dispatch) => { 
  return {   
    
    Addupdate: (data) => dispatch({
      type: 'ADDUPDATE',
      data: data
    }),
    Edit: (id) => dispatch({
      type: 'EDIT',
      data: id
    }),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
