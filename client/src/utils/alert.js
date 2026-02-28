import Swal from "sweetalert2";

export const successAlert = (title) => {
  Swal.fire({
    icon: "success",
    title,
    background: "#0f172a",
    color: "#fff",
    confirmButtonColor: "#6366f1"
  });
};

export const errorAlert = (title) => {
  Swal.fire({
    icon: "error",
    title,
    background: "#0f172a",
    color: "#fff",
    confirmButtonColor: "#ef4444"
  });
};

export const confirmAlert = async (title) => {
  const result = await Swal.fire({
    title,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#6366f1",
    cancelButtonColor: "#ef4444",
    background: "#0f172a",
    color: "#fff"
  });

  return result.isConfirmed;
};