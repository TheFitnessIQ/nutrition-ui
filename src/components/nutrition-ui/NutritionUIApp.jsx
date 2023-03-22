import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ErrorComponent from './ErrorComponent'
import HeaderComponent from './HeaderComponent'
import LoginComponent from './LoginComponent'
import LogoutComponent from './LogoutComponent'
import FoodSearchForm from './FoodSearchForm'
import './NutritionApp.css'
import WelcomeComponent from './WelcomeComponent'
import BmrCalculator from './calculators/BmrCalculator'
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
            <Route path='/' element={<LoginComponent />} />
            <Route path='/login' element={<LoginComponent />} />
            <Route path='/welcome/:username' element={
              <AuthenticatedRoute>
                <WelcomeComponent />
              </AuthenticatedRoute>
            } />
            <Route path='/food/search' element={
              <AuthenticatedRoute>
                <FoodSearchForm />
              </AuthenticatedRoute>
            } />
            <Route path='/bmrcalculator' element={
                <BmrCalculator /> 
            } />
            <Route path='/logout' element={
              <AuthenticatedRoute>
                <LogoutComponent />
              </AuthenticatedRoute>
            } />
            <Route path='*' element={<ErrorComponent />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}