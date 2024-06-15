import { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    body{
        width: 100wh;
        height: 100vh;
        display: flex;
        justify-content: center;
        background-color: #ebebeb;
    }
`

export default Global
