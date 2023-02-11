import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ErrorComponent from './ErrorComponent'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'
import LoginComponent from './LoginComponent'
import LogoutComponent from './LogoutComponent'
import FoodSearchComponent from './FoodSearchComponent'
import './NutritionApp.css'
import WelcomeComponent from './WelcomeComponent'
import AuthProvider, { useAuth } from './security/AuthContext'


function AuthenticatedRoute({ children }) {
    const authContext = useAuth()
    if (authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}
export default function NutritionApp() {
    return (
        <div className="NutritionApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent />}></Route>
                        <Route path='/login' element={<LoginComponent />}></Route>
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path='/food/search' element={
                            <AuthenticatedRoute>
                                <FoodSearchComponent />
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path='*' element={<ErrorComponent />}></Route>
                        <Route path='logout' element={
                        <AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>
                        }></Route>
                    </Routes>
                    {/* <FooterComponent /> */}
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}