import { supabase } from '../supabaseClient'

// Obtener todos los vehículos
export const obtenerVehiculos = async () => {
  const { data, error } = await supabase
    .from('vehiculos')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw error
  return data
}

// Crear un nuevo vehículo
export const crearVehiculo = async (nuevoVehiculo) => {
  const { data, error } = await supabase
    .from('vehiculos')
    .insert([nuevoVehiculo])
    .select()

  if (error) throw error
  return data
}

// Actualizar un vehículo existente
export const actualizarVehiculo = async (id, camposModificados) => {
  const { data, error } = await supabase
    .from('vehiculos')
    .update(camposModificados)
    .eq('id', id)
    .select()

  if (error) throw error
  return data
}

// Eliminar un vehículo
export const eliminarVehiculo = async (id) => {
  const { data, error } = await supabase
    .from('vehiculos')
    .delete()
    .eq('id', id)

  if (error) throw error
  return data
}