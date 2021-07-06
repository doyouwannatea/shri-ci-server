import React from 'react'
import { toast } from 'react-toastify'
import ANSIConverter from 'ansi-to-html'
import htmlParser from 'html-react-parser'

import Button from '../../$buttons/Button'
import Build from '../../Build/Build'
import Footer from '../../Footer/Footer'
import Header from '../../$header/Header'
import HeaderTitle from '../../$header/HeaderTitle'
import SettingsBtn from '../../$buttons/SettingsBtn'
import Loader from '../../Loader/Loader'

import rebuildIcon from '../../../assets/icons/12_rebuild.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useDismissToasts, useFetchBuild } from '../../../hooks'
import { setBuild } from '../../../state/actions/builds'

import './BuildPage.css'

const converter = new ANSIConverter({ bg: '#F2F2F2', fg: '#000' })

const BuildPage = () => {
    useDismissToasts()
    const loading = useSelector(state => state.builds.loading)
    const repoName = useSelector(state => state.settings.repo)

    const history = useHistory()
    const dispatch = useDispatch()
    const { buildNumber } = useParams()

    const { build, logs } = useFetchBuild(buildNumber)

    const onRebuild = async () => {
        if (build) {
            try {
                const buildId = await dispatch(setBuild(build.commitHash))
                history.push(`/build/${buildId}`)
            } catch (error) {
                toast.error('Another repository')
            }
        }
    }

    return (
        <div className="page">
            <Header title={<HeaderTitle color="#000" value={repoName} />}>
                <Button
                    variant="silent"
                    adaptive
                    action={onRebuild}
                    disabled={!Boolean(build)}
                    icon={rebuildIcon}>Rebuild</Button>
                <SettingsBtn />
            </Header>
            <main className="build-page page__body">
                <Loader loading={loading} />
                {build &&
                    <div className="container">
                        <Build key={build.id} {...build} />
                    </div>}
                <code className="log build-page__log container">
                    <pre className="log__content">
                        {htmlParser(converter.toHtml(logs))}
                    </pre>
                </code>
            </main>
            <Footer />
        </div>
    )
}

export default BuildPage