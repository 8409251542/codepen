import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import "./style.css"

const API_KEY = 'AIzaSyCIVeLWqvF6yspioIdGHzDlX2BkMqPwWy0';
const genAI = new GoogleGenerativeAI(API_KEY);

const AIComponent = () => {
    const [input, setInput] = useState('');
    const [responses, setResponses] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleClick = async () => {
        const prompt = input || '5 best ways to write code';
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response.text();
        console.log(response);
        setResponses([...responses, { question: prompt, answer: response }]);
        setInput('');
    };

    const openPopup = () => {
        setIsPopupOpen(true);
        handleClick();
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div>

            <div className="relative">
                <button onClick={openPopup} className="z-20 text-white flex flex-col shrink-0 grow-0 justify-around 
                  fixed bottom-0 right-0 right-5 rounded-lg
                  mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10">
                    <div className="p-3 rounded-full border-4 border-white bg-green-600">
                        <svg
                            className="w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path

                                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"

                            ></path>
                        </svg>
                    </div>

                </button>
            </div>

            {isPopupOpen && (
                <div className="container-pop w-[80vw] h-[80vh] absolute top-2 left-2">
                    <button type="button" onClick={closePopup} className="bg-white relative top-0 left-[23rem] rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>

                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>


                    <div id="listnew">
                        {responses.map((response, index) => (
                            <ul key={index}>
                                <li className="aiQue">{response.question}</li>
                                <li className="aiAns">{response.answer}</li>
                            </ul>
                        ))}
                    </div>
                    <div className='flex'>
                        <input type="text" onChange={handleInputChange} className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search anything..." />

                        <div className="absolute top-4 right-3">
                            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
                        </div>
                        <button onClick={handleClick}
                            className="hover:text-green-600 text-white backdrop-blur-lg bg-gradient-to-tr from-transparent bg-black to-transparent rounded-md py-2 px-6 shadow hover:shadow-green-600 duration-700"
                        >
                            Submit
                        </button>
                    </div>
                </div>

            )}
        </div>
    );
};

export default AIComponent;
