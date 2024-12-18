import Link from "next/link";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { clearPersistedState, useAppSelector } from "@/redux/store";

const ToProfile = () => {

  const username = useAppSelector((state) => state.signUpReducer.value.username);

  return (
    <div className="flex flex-col w-full">
      {/* Profile Header */}
      <div className="flex flex-1 justify-center items-center">
        <h1 className="font-bold text-2xl mb-5">
            Great! Now let&apos;s head to your profile!
        </h1>
      </div>

      {/* Next Step Button */}
      <div className="self-end mt-auto">
        {/* This uses the development URL and will need to be changed */}
        <Link href={`/profile/${username}`}>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            className="primary-btn py-3 px-6"
            onClick = {() => {
              clearPersistedState();
             }}
          >
            Profile!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToProfile;
