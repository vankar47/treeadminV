import React, { useState } from "react";
import usersHttp from "../../http/usersHttp";

const Limit = (props) => {
  const { cellData,adminAuthToken,rowData } = props;
  const [localLimit, setLocalLimit] = useState(cellData.couponLimit);

  return (
    <div>
      <input
        style={{
          width: "20px",
          height: "20px",
          borderColor: "grey",
          borderStyle: "none",
          backgroundColor: "white",
        }}
        value={localLimit}
        onChange={async (newlimit) => {
            // console.log(cellData);
          setLocalLimit(newlimit.target.value);
        }}
        // onBlur={async (e) => {
        //         try {
        //             const res = await usersHttp.makeVip(rowData._id, adminAuthToken,"",localLimit);
        //             alert("Limit Increased");
        //             console.log(res);
        //             // window.location.reload();
        //           } catch (error) {
        //             setLocalLimit(cellData.couponLimit);
        //             console.log(error);
        //           }
              
        // }}
        onKeyDown={async (e) => {
            if (e.key === 'Enter') {
                try {
                    const res = await usersHttp.makeVip(rowData._id, adminAuthToken,"",localLimit);
                    alert("Limit Increased");
                    console.log(res);
                    // window.location.reload();
                  } catch (error) {
                    setLocalLimit(cellData.couponLimit);
                    console.log(error);
                  }
              }
        }}
      />
    </div>
  );
};

export default Limit;
