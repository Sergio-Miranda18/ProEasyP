import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '../page/login/login';
import { Navbar } from '../../Navbar';
import { GestionarReserva } from '../page/Admin/GestionarReserva';
import { Index } from '../page/user/Index';
import { Registro } from '../page/register/registro';
import { PageNotFound } from '../componentes/PageNotFound';
import { Reserva } from '../page/user/Reserva/Reserva';
import { GestionarServicios } from '../page/Admin/GestionarServicios';
import { ProtectedRoute } from './ProtectedRoute';
import { IndexPage } from '../page/indexPage';
import { VerReservas } from '../page/user/VerR';
import { Lugares } from '../page/user/Lugares';
import Inicio from '../page/Inicio/Inicio'; 
import Confirmacion from '../componentes/Confirmacion/Confirmacion';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/Inicio" />} />
        <Route path="/Inicio" element={<Inicio />} />

        <Route path="/Credenciales" element={<IndexPage />} />
        <Route path="*" element={<PageNotFound />} />
        
        <Route element={<Navbar />}>
          {"USUARIO"}
          <Route path="/Index" element={
            <ProtectedRoute allowedRoles={['USER']} element={<Index />} />
          } />
          <Route path="/Reserva" element={
            <ProtectedRoute allowedRoles={['USER']} element={<Reserva />} />
          } />
          <Route path="/VerR" element={
            <ProtectedRoute allowedRoles={['USER']} element={<VerReservas />} />
          } />
          <Route path="/Lugares" element={
            <ProtectedRoute allowedRoles={['USER']} element={<Lugares />} />
          } />
          <Route path="/confirmacion" element={
                  <ProtectedRoute allowedRoles={['USER']} element={<Confirmacion />} />
          } />

          {"ADMINISTRADOR"}
          <Route path="/GestionarReserva" element={
            <ProtectedRoute allowedRoles={['ADMIN']} element={<GestionarReserva />} />
          } />
          <Route path="/GestionarServicios" element={
            <ProtectedRoute allowedRoles={['ADMIN']} element={<GestionarServicios />} />
          } />
        </Route>
      </Routes>
    </>
  );
};
