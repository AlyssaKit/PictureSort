import React from 'react'
import styled from '@emotion/styled'

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 200px
`

const Loader = styled.div`
    justify-content: center;  
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid #FFF;
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      } 
`

function Spinner() {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    )
}

export default Spinner