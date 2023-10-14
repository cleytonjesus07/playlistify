export default function Container({ children, className }) {
    return (
        <div className={`
            bg-primary-color 
            rounded-2xl
            shadow-sm 
            shadow-senary-color 
            border-2 
            border-solid 
            border-senary-color
            sombra
            ${className}
        `}
        >
            {children}
        </div>
    )
}