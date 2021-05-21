import { useEffect, useRef, useState } from "react"


export const useFetch = ( url ) => {

    const isMounted = useRef(true)
    
    const [state, setState] = useState({ data: null, loading: true, error: null })


    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    // creo una referencia para saber si el componente está montado o no
    // cuando se monta se inicia en true, pero cuando se desmonta queda en false
    // de esa manera condiciono el setState para evitar errores asincronos en desmontaje

    useEffect( ()=>{

        setState({ data: null, loading: true, error: null })

        fetch(url)
            .then( res => res.json() )
            .then( data => {

                if (isMounted.current){
                    setState({
                        loading: false,
                        error: null,
                        data: data
                    })
                }
            })
            .catch(()=>{
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                })
            })

    }, [url])

    return state
}
