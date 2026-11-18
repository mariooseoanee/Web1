import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { esquemaInscripcion, type DatosInscripcion } from '../esquema/esquema';

import CampoTexto from './CampoTexto';
import GrupoRadio from './GrupoRadio';
import GrupoCheckboxes from './GrupoCheckboxes';
import CampoSelect from './CampoSelect';

export default function FormularioHackathon() {
    const [mensajeExito, setMensajeExito] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<DatosInscripcion>({
        resolver: zodResolver(esquemaInscripcion),
        defaultValues: {
            nombre: "",
            email: "",
            nivel: undefined,
            lenguajes: [],
            github: "",
            tallaCamiseta: undefined
        }
    });

    const nombreActual = watch("nombre") || "";

    const onSubmit = async (data: DatosInscripcion) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Inscripción validada y enviada:", data);
        setMensajeExito("¡Inscripción recibida! 🎉");
        reset();
        setTimeout(() => setMensajeExito(""), 4000);
    };

    return (
        <div className="formulario-contenedor">
            <h2>Inscripción HackU-tad 2026</h2>

            {mensajeExito && <div className="alerta-exito" role="alert">{mensajeExito}</div>}

            <form noValidate onSubmit={handleSubmit(onSubmit)}>

                <CampoTexto
                    label="Nombre completo"
                    id="nombre"
                    registro={register("nombre")}
                    error={errors.nombre}
                    contador={nombreActual.length}
                />

                <CampoTexto
                    label="Email"
                    id="email"
                    type="email"
                    registro={register("email")}
                    error={errors.email}
                />

                <GrupoRadio
                    label="Nivel de experiencia"
                    registro={register("nivel")}
                    error={errors.nivel}
                    opciones={[
                        { label: "Principiante", value: "principiante" },
                        { label: "Intermedia", value: "intermedia" },
                        { label: "Avanzada", value: "avanzada" }
                    ]}
                />

                <GrupoCheckboxes
                    label="Lenguajes (al menos uno)"
                    registro={register("lenguajes")}
                    error={errors.lenguajes}
                    opciones={[
                        { label: "JavaScript", value: "JavaScript" },
                        { label: "Python", value: "Python" },
                        { label: "Java", value: "Java" }
                    ]}
                />

                <CampoTexto
                    label="Perfil de GitHub (Opcional salvo nivel avanzado)"
                    id="github"
                    type="url"
                    placeholder="https://github.com/..."
                    registro={register("github")}
                    error={errors.github}
                />

                <CampoSelect
                    label="Talla de camiseta"
                    id="tallaCamiseta"
                    registro={register("tallaCamiseta")}
                    error={errors.tallaCamiseta}
                    opciones={["S", "M", "L", "XL"]}
                />

                <div className="campo">
                    <label className="checkbox-legal">
                        <input type="checkbox" {...register("aceptaNormas")} />
                        Acepto las normas
                    </label>
                    {errors.aceptaNormas && <span className="error">{errors.aceptaNormas.message}</span>}
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Inscribirme"}
                </button>
            </form>
        </div>
    );
}