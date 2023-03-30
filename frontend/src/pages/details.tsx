//REACT-ROUTER-DOM
import { Link, useParams } from 'react-router-dom';
//APOLLO-CLIENT
import { useQuery, gql } from '@apollo/client';


const ONE_CLIENT_QUERY = gql`
    query OneClient($oneClientId: ID!) {
        oneClient(id: $oneClientId) {
            id
            age
            name
            additionalInfo {
                phone
                address
                email
                company
                gender
            }
        }
    }
`;


export default function Details() {
    const { id } = useParams();


    const { loading, error, data } = useQuery(ONE_CLIENT_QUERY, {
        variables: { oneClientId: id }
    });


    if (loading) return <div className="h-screen bg-gradient-to-r from-green-400 to-blue-500">Loading...</div>;
    if (error) return <div className="h-screen bg-gradient-to-r from-green-400 to-blue-500">Error: {error.message}</div>;


    const client = data.oneClient;


    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
            <div className="max-w-md w-full">
                <h1 className="text-4xl font-bold mb-6 tracking-wide text-center text-white animate-bounce">
                    Client Details 👨
                </h1>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg p-8">
                    {
                        client.name && (
                            <div className="mb-4">
                                <span className="font-bold mr-2">Name :</span> {client.name}
                            </div>
                        )
                    }
                    {
                        client.id && (
                            <div className="mb-4">
                                <span className="font-bold mr-2">ID :</span> {client.id}
                            </div>
                        )
                    }
                    {
                        client.age && (
                            <div className="mb-4">
                                <span className="font-bold mr-2">Age :</span> {client.age}
                            </div>
                        )
                    }
                    {
                        client.additionalInfo.phone && (
                            <div className="mb-4">
                                <span className="font-bold mr-2">Phone :</span> {client.additionalInfo.phone}
                            </div>
                        )
                    }
                    {
                        client.additionalInfo.address && (
                            <div className="mb-4">
                                <span className="font-bold mr-2">Address :</span> {client.additionalInfo.address}
                            </div>
                        )
                    }
                    {
                        client.additionalInfo.email && (
                            <div className="mb-4">
                                <span className="font-bold mr-2">Email :</span> {client.additionalInfo.email}
                            </div>
                        )
                    }
                    {
                        client.additionalInfo.company && (

                            <div className="mb-4">
                                <span className="font-bold mr-2">Company :</span> {client.additionalInfo.company}
                            </div>
                        )
                    }
                    {
                        client.additionalInfo.gender && (
                            <div className="mb-4">
                                <span className="font-bold mr-2">Gender :</span> {client.additionalInfo.gender}
                            </div>
                        )
                    }
                    <Link to="/" className="text-white font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-2 px-4 rounded-md">
                        &larr; Back to all clients
                    </Link>
                </div>
            </div>
        </div>
    )
}