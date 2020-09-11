  
import React from 'react';
import styled from 'styled-components';

const Loser = styled.div`
  color: white;
  font-size: 8px;
  width: 50%;
  justify-content: center;
  flex-direction: column;
`;

const Solo = styled.div`
  flex-direction: column;
  justify-content: center;
  border: 1px solid red;
`;

const Users = props => {
    if (props.users.length === 0){
        return <Loser>Not one member.</Loser>
    }
            return (
            props.users.map(user => {
                return(
                    <Loser key={user.id}>
                        <Solo>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>{user.terms ? 'Human' : 'Non-Human'}</p>
                        </Solo>
                    </Loser>
                )
            }
        ))        
        
    }


export default Users;