import { Icon } from "../static/icon";
import Tippy from '@tippyjs/react/headless';

const Reaction = () => {
  return (
    <div className="absolute bottom-10 left-0 p-1 bg-white rounded-3xl shadow-xl flex z-40">
      {Icon.Reaction.map((item, index) => (
        <Tippy
          render={attrs => (
            <div className={`box addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
              {...attrs}>
              {item.name}
            </div>)}>
          <div className={``}
            // onClick={() => setPick(index + 3)}
            key={index}>
            <div className="flex p-1 cursor-pointer items-center relative">
              <div className="h-10 w-10 rounded-full overflow-hidden object-cover">
                <img src={item.iconURL} alt="" />
              </div>
            </div>
          </div>
        </Tippy>
      ))}
    </div>
  )
}

export default Reaction