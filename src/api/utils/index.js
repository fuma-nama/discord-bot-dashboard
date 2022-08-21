import {config} from "../../config/config";
import {useMutation, useQueryClient} from "react-query";
import {setFeatureEnabled} from "../internal";

export function fetchAuto(url, {toJson = false, throwError = true, ...options} = {}) {
    const request = fetch(`${config.serverUrl}${url}`, {
        credentials: "include",
        headers: {
            'content-type': 'application/json'
        },
        ...options
    })
    let mapper

    if (toJson) {
        mapper = res => res.json()
    } else {
        mapper = res => res.text().then(() => res)
    }

    return request.then(res => {

        if (res.ok || !throwError) {

            return mapper? mapper(res) : res
        } else {
            return res.text().then(s => {
                const error = new Error(s);
                throw error
            })
        }
    })
}

export function useEnableFeatureMutation(serverId, featureId) {
    const client = useQueryClient()

    return useMutation(
        (enabled) => setFeatureEnabled(serverId, featureId, enabled),
        {
            onSuccess(_, enabled) {
                const modify = (data) => {
                    if (enabled) {
                        return [...data.enabled, featureId]
                    } else {
                        return data.enabled.filter(id => featureId !== id)
                    }
                }

                return client.setQueryData(
                    ["features", serverId],
                    data => ({
                        ...data,
                        enabled: modify(data)
                    })
                )
            }
        }
    )
}