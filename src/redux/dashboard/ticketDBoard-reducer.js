import { ticketDashBoarAPI } from '../../api/apiTicket'
import { selectPageSize } from './settingDBoard-reducer'
import { ticketAPI } from '../../api/apiTicketClient'

const GET_TICKET_DATA = 'GET_TICKET_DATA';
const SET_TICKET_DATA = 'SET_TICKET_DATA';
const SET_TICKET_TOTAL = 'SET_TICKET_TOTAL';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const DEL_TICKET = 'DEL_TICKET';
const GET_TICKET_CATEGORY = 'GET_TICKET_CATEGORY'

let initialState = {
    ticketData: [],
    currentPage: 1,
    totalTickets: 0,
    ticketCategories: []
}

const ticketDBoardReducer = (state = initialState, action) => {
    switch(action.type){
            case GET_TICKET_DATA:{
                return {...state, 
                    ticketData:  action.data
                }
            }
            case SET_TICKET_DATA:
                return { ...state, ticketData: [...state.ticketData, action.data] 
            };
            case SET_TICKET_TOTAL:{
                    return {...state, 
                        totalTickets:  action.total
                    }
                }
            case SET_CURRENT_PAGE:{   
                return {...state, 
                    currentPage: action.currentPage
                }
            }
            case GET_TICKET_CATEGORY:
                return { ...state, ticketCategories: action.data 
            };
            case DEL_TICKET: {
                const { id } = action.id;
                const updatedTicketData = state.eventData.filter(event => event.id !== id);
                return { ...state, eventData: updatedTicketData };
            }
            default:
                return state 
    }
}

export const getDashBoardTicketsActionCreater = (data) => ({ type: GET_TICKET_DATA, data })
export const getDashBoardTicketActionCreater = (data) => ({ type: GET_TICKET_DATA, data })
export const setDashBoardTicketsActionCreater = (data) => ({ type: SET_TICKET_DATA, data })
export const setTotalTickets = (total) => ({ type: SET_TICKET_TOTAL, total })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const deleteTickets = (id) => ({ type: DEL_TICKET, id})
export const getTicketCategoriesAC = (data) => ({ type: GET_TICKET_CATEGORY, data})

// client
//One
export const getTicketThunkCreator = (id) => async (dispatch) => {
    try {
      const data = await ticketAPI.getTicket(id);
      dispatch(getDashBoardTicketActionCreater(data));
    } catch (error) {
      console.error('Ошибка получения билетов:', error);
      return { success: false, error: error.message };
    }
  };

//All
export const getTicketsThunkCreator = () => async (dispatch) => {
    try {
      const data = await ticketAPI.getTickets();
      const tickets = data;
        
      dispatch(getDashBoardTicketsActionCreater(tickets));
    } catch (error) {
      console.error('Ошибка получения билетов:', error);
      return { success: false, error: error.message };
    }
  };

//end


export const getDashBoardTicketsThunkCreator = (currentPage = 1)  =>(dispatch, getState)=>{
    const pageSize = selectPageSize(getState()); 
    dispatch(setCurrentPage(currentPage))
    ticketDashBoarAPI.getTickets()
        .then(data =>{
            dispatch(setTotalTickets(data.length))
            dispatch(getDashBoardTicketsActionCreater(data.splice(pageSize*(currentPage -1), pageSize)));
        })
        .catch(error => {
            console.log(error);
        })
}

export const getDashBoardTicketCategories = () => (dispatch) => {
    ticketDashBoarAPI.getTicketCategories()
        .then(data =>{
            dispatch(getTicketCategoriesAC(data))
        })
        .catch(error => {
            console.log(error);
        })
    }    

export const setDashBoardTicketsThunkCreator = (eventId, date, time, ticketCategoriesId, total, price)  => (dispatch) =>{
    const categoriesId = ticketCategoriesId.join(',')
    ticketDashBoarAPI.setTickets(eventId, date, time, categoriesId, total, price)
        .then(data =>{
            const ticketId = data.ticketId
            ticketDashBoarAPI.getTicketById(ticketId)
            .then((fullTicketData) => {
                dispatch(setDashBoardTicketsActionCreater(fullTicketData));
            })
            .catch((error) => {
                console.error(`Произошла ошибка при получении данных о билете: ${error.message}`);
            });
            
        })
        .catch(error => {
            console.log(error);
        })
}

export const updateDashBoardTicketsThunkCreator = (id, eventId, price, total, date, time, ticketCategoriesId)  => (dispatch) =>{
    const categoriesId = ticketCategoriesId.join(',')
    
    ticketDashBoarAPI.updateTickets(id, eventId, price, total, date, time, categoriesId)
        .then(data =>{
            dispatch(setDashBoardTicketsActionCreater(data))
        })
        .catch(error => {
            console.log(error);
        })
}

export const deleteDashBoardTicketsThunkCreator = (id)  => (dispatch) =>{
    ticketDashBoarAPI.deleteTickets(id)
        .then(data =>{
            dispatch(deleteTickets(data.id))
        })
        .catch(error => {
            console.log(error);
        })
}

export default ticketDBoardReducer