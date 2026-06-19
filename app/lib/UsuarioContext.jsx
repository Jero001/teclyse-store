"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

const UsuarioContext = createContext();

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);

  useEffect(() => {
    // Revisa si ya hay una sesión activa al cargar la app
    const obtenerSesion = async () => {
      const { data } = await supabase.auth.getSession();
      setUsuario(data.session?.user ?? null);
      setCargandoUsuario(false);
    };

    obtenerSesion();

    // Escucha cambios de sesión (login, logout) en tiempo real
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUsuario(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
  };

  return (
    <UsuarioContext.Provider value={{ usuario, cargandoUsuario, cerrarSesion }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  return useContext(UsuarioContext);
}