import React,{Component} from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux'
import BackDrop from '../../components/UI/BackDrop/BackDrop'
const erroHandler = (Wrappedcomponent,axios) =>{
    return class extends Component {
        state={
            error:null
        }
        componentWilldMount () {
            this.reqInterceptor =axios.interceptors.request.use( req => {
                this.setState({
                    error:null
                })
                return req
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error
                })
            })
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)   
        }

        errorConfirmSate = () =>{
            this.setState({
                error:null
            })
        }
        render () {
            
            return (
                <Aux>
        
            <BackDrop display={this.state.error} backdropClicked= {this.errorConfirmSate}/>
            
                <Modal display={this.state.error}
                
                >
                        {this.state.error ? this.state.error.message : null}
                </Modal>
                
                <Wrappedcomponent {...this.props} />
            </Aux>
            )
        }
    }
        
    }


export default erroHandler