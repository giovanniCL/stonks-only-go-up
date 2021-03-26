// Inline Design Elements

// react-select input
export const reactSelectInputTheme = (theme) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary25: "#e8e8e8",
        primary: "darkblue",
        neutral0: "rgb(240, 240, 240);",
        neutral80: "black",
    },
    borderRadius: 4,
    outline: "none",
    width: "100%",
});

export const reactSelectInputStyles = {
    control: (provided, state) => ({
        ...provided,
        boxShadow: "none",
        border: "none",
        fontSize: 14,
        fontFamily: "Ubuntu",
        margin: 0,
        height: 34,
        minHeight: 34
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        margin: "0",
        padding: "4px 10px",
        color: "white",
    }),
    multiValue: (provided) => ({
        ...provided,
        color: "#713ffe;",
        background: "#ddd5fb",
    }),
    option: (base, state) => ({
        ...base,
        fontSize: 14,
        fontFamily: "Poppins",
        cursor: "pointer",
        
    }),
}
