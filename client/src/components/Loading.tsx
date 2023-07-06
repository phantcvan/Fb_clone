import { Oval } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div>
            <Oval
                height={100}
                width={100}
                color="#1A6ED8"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#21ADFB"
                strokeWidth={2}
                strokeWidthSecondary={2}

            />
        </div>
    )
}

export default Loading