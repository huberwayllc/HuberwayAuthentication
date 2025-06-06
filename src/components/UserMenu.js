import React from "react";
import Avatar from "@mui/material/Avatar";
import MessageIcon from "@mui/icons-material/Message";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";

function UserMenu({ user, onLogout }) {
    const navigate = useNavigate();

    const totalAccounts = (user?.sub_accounts?.length || 0) + 1;

    const filledFields = [
        user?.first_name,
        user?.last_name,
        user?.company?.company_name,
        user?.subscription?.status === "confirmed" ? "ok" : null,
    ];

    const completionPercentage = Math.round(
        (filledFields.filter(Boolean).length / filledFields.length) * 100
    );

    const subscriptionStatus = user?.subscription?.status || "Nessuna sottoscrizione";
    const subscriptionAccounts = user?.subscription?.user_count;
    const planId = user?.subscription?.plan_id || "-";
    const statusColor = subscriptionStatus === "confirmed" ? "#22c55e" : "#facc15";

    return (
        <div
            className="user-popup-menu"
            style={{
                position: "absolute",
                top: "60px",
                right: "0",
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                padding: "20px",
                zIndex: 1000,
                width: "300px",
            }}
        >
            <div className="d-flex gap-2 align-items-center">
                <Avatar sx={{ bgcolor: "orange" }}>
                    {(user.name || "Gennaro Ereditata").charAt(0).toUpperCase()}
                </Avatar>
                <div className="d-flex flex-column gap-1">
                    <p className="mb-0">
                        <strong>{user.name || "Gennaro Ereditata"}</strong>
                    </p>
                    <p style={{ margin: 0, color: "#64748B" }}>
                        {user.email || "g.ereditata@huberway.com"}
                    </p>
                    <p
                        onClick={() =>
                            navigate("/account/settings/user-preferences/profile")
                        }
                        style={{ color: "#0039A9", cursor: "pointer" }}
                        className="mb-0 hoverUnderline"
                    >
                        <b>Profilo e preferenze</b>
                    </p>
                </div>
            </div>

            <hr className="my-3" />

            <div className="d-flex gap-2 align-items-center">
                <MessageIcon
                    className="position-relative"
                    style={{ fontSize: "15px", top: "3px" }}
                />
                <p style={{ fontWeight: "600" }} className="mb-0 text-black">
                    Share a feedback of platform
                </p>
            </div>

            <hr className="my-3" />

            <div className="d-flex flex-column gap-0 align-items-start">
                <p style={{ color: "#99acc2" }} className="mb-0 fw-bold">
                    Account
                </p>
                <p style={{ fontWeight: "600" }} className="mb-0 text-black">
                    {user.company?.company_name || "Nessuna compagnia associata"}
                </p>
                <p className="mb-0">Account ID: HWS0203{user.id || "N/A"}</p>
                <p className="mb-0">
                    Active account: <strong>{totalAccounts}/{subscriptionAccounts}</strong>
                </p>
            </div>

            <hr className="my-3" />

            <div className="d-flex flex-column align-items-start w-100">
                <p style={{ fontWeight: "600" }} className="mb-0">
                    Account configuration status
                </p>
                <div className="text-end w-100 position-relative mt-2">
                    <p
                        className="mb-0 text-black position-absolute"
                        style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            color: "#64748B",
                            bottom: "18px",
                            right: "0px",
                        }}
                    >
                        {completionPercentage}%
                    </p>
                    <div
                        style={{
                            width: "100%",
                            backgroundColor: "#e5e7eb",
                            borderRadius: "5px",
                            height: "18px",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                width: `${completionPercentage}%`,
                                backgroundColor:
                                    completionPercentage >= 80 ? "#22c55e" : "#0039A9",
                                height: "100%",
                                transition: "width 0.3s",
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            <hr className="my-3" />

            {/* Sezione Sottoscrizione */}
            <div className="d-flex flex-column align-items-start w-100">
                <p style={{ fontWeight: "600" }} className="mb-1">
                    Subscription
                </p>
                <p className="mb-0">
                    Stato:{" "}
                    <span
                        style={{
                            color: statusColor,
                            fontWeight: "600",
                            textTransform: "capitalize",
                        }}
                    >
                        {subscriptionStatus}
                    </span>
                </p>
                <p className="mb-0">Piano attivo: <strong>{planId}</strong></p>
            </div>

            <hr className="my-3" />

            <div className="d-flex gap-2 align-items-center">
                <Diversity3Icon />
                <p style={{ fontWeight: "600" }} className="mb-0">
                    Invite Teams
                </p>
            </div>

            {/*
            <hr className="my-3" />

            <div className="d-flex flex-column gap-0 align-items-start">
                <div
                    style={{ marginBottom: "15px" }}
                    className="d-flex gap-2 align-items-center"
                >
                    <p style={{ fontWeight: "600" }} className="text-black mb-0">
                        Account e Fatturazione
                    </p>
                </div>

                <div
                    style={{ marginBottom: "15px" }}
                    className="d-flex gap-2 align-items-center"
                >
                    <p style={{ fontWeight: "600" }} className="text-black mb-0">
                        Huberway Academy
                    </p>
                    <OpenInNewIcon
                        style={{ fontSize: "18px", position: "relative", top: "1px" }}
                    />
                </div>

                <div
                    style={{ marginBottom: "15px" }}
                    className="d-flex gap-2 align-items-center"
                >
                    <p style={{ fontWeight: "600" }} className="text-black mb-0">
                        Prezzi e funzionalità
                    </p>
                    <OpenInNewIcon
                        style={{ fontSize: "18px", position: "relative", top: "1px" }}
                    />
                </div>

                <div
                    style={{ marginBottom: "15px" }}
                    className="d-flex gap-2 align-items-center"
                >
                    <p style={{ fontWeight: "600" }} className="text-black mb-0">
                        Aggiornamenti sui prodotti
                    </p>
                </div>

                <div className="d-flex gap-2 align-items-center">
                    <p style={{ fontWeight: "600" }} className="text-black mb-0">
                        Formazione e servizi
                    </p>
                    <OpenInNewIcon
                        style={{ fontSize: "18px", position: "relative", top: "1px" }}
                    />
                </div>
            </div>
*/}
            <hr className="my-3" />

            <div className="d-flex justify-content-between gap-2 align-items-center">
                <p
                    onClick={onLogout}
                    style={{
                        fontWeight: "600",
                        color: "#0039A9",
                        fontWeight: "700",
                        cursor: "pointer",
                    }}
                    className="mb-0"
                >
                    Esci
                </p>
                <p
                    style={{
                        fontWeight: "600",
                        color: "#0039A9",
                        fontWeight: "700",
                        cursor: "pointer",
                    }}
                    className="mb-0"
                >
                    Privacy policy
                </p>
            </div>
        </div>
    );
}

export default UserMenu;
