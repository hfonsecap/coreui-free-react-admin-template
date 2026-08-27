import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export const useVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargarVehiculos = useCallback(async () => {
    setCargando(true)
    setError('')

    try {
      const { data, error: errorSupabase } = await supabase
        .from('vehiculos')
        .select('*')

      if (errorSupabase) {
        setError(`Error de Supabase: ${errorSupabase.message}`)
        setVehiculos([])
      } else {
        setVehiculos(data ?? [])
      }
    } catch (err) {
      console.error('Error de conexión:', err)
      setError('Error de conexión con Supabase. Revisa la consola del navegador.')
    }

    setCargando(false)
  }, [])

  useEffect(() => {
    cargarVehiculos()
  }, [cargarVehiculos])

  return { vehiculos, cargando, error, recargar: cargarVehiculos }
}