  
import React from 'react';
import styled from 'styled-components';

const Loser = styled.div`
  color: white;
  font-size: 8px;
`;

const Users = props => {
    if (props.users.length === 0){
        return <Loser>Not one friend.</Loser>
    }
            return (
            props.users.map(user => {
                return(
                    <div key={user.id}>
                        <Loser>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        </Loser>
                    </div> 
                )
            }
        ))        
        
    }


export default Users;