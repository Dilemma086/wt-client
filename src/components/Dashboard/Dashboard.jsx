import { Routes, Route } from 'react-router-dom';
import DashBoardHeader from './DashBoardHeader/DashBoardHeader';
import DashBoardSidebarWrapper from './DashBoardSidebarWrapper/DashBoardSidebarWrapper';
import DashBoardContent from './DashBoardContent/DashBoardContent';
import DashBoardTicket from './DashBoardTicket/DashBoardTicket';
import DashBoardLocations from './DashBoardLocations/DashBoardLocations';
import DashBoardActers from './DashBoardActers/DashBoardActers'
import DashBoardEvents from './DashBoardEvents/DashBoardEvents'
import DashBoardOrders from './DashBoardOrders/DashBoardOrders'
import style from './Dashboard.module.css';

const Dashboard = () => {
   
    
    return (
        <div className={style.headerDashBoard}>
            <DashBoardHeader />
            <div className={style.mainDashBoard}>
                <DashBoardSidebarWrapper />
                <Routes>
                    <Route path="/" element={<DashBoardContent  />} />
                    <Route path="tickets" element={<DashBoardTicket />} />
                    <Route path="orders" element={<DashBoardOrders />} />  
                    <Route path="events" element={<DashBoardEvents/>} />  
                    <Route path="acters" element={<DashBoardActers/>} /> 
                    <Route path="locations" element={<DashBoardLocations/>} /> 
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
